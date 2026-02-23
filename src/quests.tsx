import { List, ActionPanel, Action, Icon, showToast, Toast, openExtensionPreferences } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { fetchQuests, completeQuest, uncompleteQuest, updateQuestStatus } from "./api";
import { Quest } from "./types";
import { sortQuests } from "./utils";
import { QuestListItem } from "./components/QuestListItem";

export default function QuestsCommand() {
  const { isLoading, data: quests, error, revalidate, mutate } = useCachedPromise(fetchQuests);

  async function handleCompleteQuest(quest: Quest) {
    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Completing quest...",
    });

    try {
      const updatedQuest = await completeQuest(quest.id);

      await mutate(
        async () => {
          const allQuests = await fetchQuests();
          return allQuests;
        },
        {
          optimisticUpdate: (data) => data?.map((q) => (q.id === updatedQuest.id ? updatedQuest : q)) || [],
        }
      );

      toast.style = Toast.Style.Success;
      toast.title = "Quest Completed!";
      toast.message = `+${updatedQuest.xpReward} XP, +${updatedQuest.goldReward} Gold`;
    } catch (err) {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed to complete quest";
      toast.message = err instanceof Error ? err.message : "Unknown error";
    }
  }

  async function handleUncompleteQuest(quest: Quest) {
    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Reopening quest...",
    });

    try {
      const updatedQuest = await uncompleteQuest(quest.id);

      await mutate(
        async () => {
          const allQuests = await fetchQuests();
          return allQuests;
        },
        {
          optimisticUpdate: (data) => data?.map((q) => (q.id === updatedQuest.id ? updatedQuest : q)) || [],
        }
      );

      toast.style = Toast.Style.Success;
      toast.title = "Quest Reopened";
      toast.message = "Quest marked as incomplete";
    } catch (err) {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed to reopen quest";
      toast.message = err instanceof Error ? err.message : "Unknown error";
    }
  }

  async function handleUpdateStatus(quest: Quest, newStatus: Quest["status"]) {
    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Updating quest...",
    });

    try {
      const updatedQuest = await updateQuestStatus(quest.id, newStatus);

      await mutate(
        async () => {
          const allQuests = await fetchQuests();
          return allQuests;
        },
        {
          optimisticUpdate: (data) => data?.map((q) => (q.id === updatedQuest.id ? updatedQuest : q)) || [],
        }
      );

      toast.style = Toast.Style.Success;
      toast.title = "Quest updated";
      toast.message = `Status changed to ${newStatus}`;
    } catch (err) {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed to update quest";
      toast.message = err instanceof Error ? err.message : "Unknown error";
    }
  }

  if (error && error.message.includes("Invalid API token")) {
    return (
      <List>
        <List.EmptyView
          icon={Icon.ExclamationMark}
          title="Invalid API Token"
          description="Please check your Marcel API token in extension preferences."
          actions={
            <ActionPanel>
              <Action title="Open Extension Preferences" onAction={openExtensionPreferences} />
            </ActionPanel>
          }
        />
      </List>
    );
  }

  const sortedQuests = quests ? sortQuests(quests) : [];
  const todoQuests = sortedQuests.filter((q) => !q.done && q.status === "todo");
  const doingQuests = sortedQuests.filter((q) => !q.done && q.status === "doing");
  const doneQuests = sortedQuests.filter((q) => q.done || q.status === "done");

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search quests...">
      {!isLoading && sortedQuests.length === 0 && (
        <List.EmptyView
          icon={Icon.CheckCircle}
          title="No quests found"
          description="You don't have any quests yet. Create one in the Marcel app!"
        />
      )}

      {doingQuests.length > 0 && (
        <List.Section title="In Progress" subtitle={`${doingQuests.length} quests`}>
          {doingQuests.map((quest) => (
            <QuestListItem
              key={quest.id}
              quest={quest}
              onComplete={handleCompleteQuest}
              onUncomplete={handleUncompleteQuest}
              onUpdateStatus={handleUpdateStatus}
              onRefresh={revalidate}
            />
          ))}
        </List.Section>
      )}

      {todoQuests.length > 0 && (
        <List.Section title="To Do" subtitle={`${todoQuests.length} quests`}>
          {todoQuests.map((quest) => (
            <QuestListItem
              key={quest.id}
              quest={quest}
              onComplete={handleCompleteQuest}
              onUncomplete={handleUncompleteQuest}
              onUpdateStatus={handleUpdateStatus}
              onRefresh={revalidate}
            />
          ))}
        </List.Section>
      )}

      {doneQuests.length > 0 && (
        <List.Section title="Completed" subtitle={`${doneQuests.length} quests`}>
          {doneQuests.map((quest) => (
            <QuestListItem
              key={quest.id}
              quest={quest}
              onComplete={handleCompleteQuest}
              onUncomplete={handleUncompleteQuest}
              onUpdateStatus={handleUpdateStatus}
              onRefresh={revalidate}
            />
          ))}
        </List.Section>
      )}
    </List>
  );
}
