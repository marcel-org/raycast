/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Marcel API Token - Your Marcel API token (starts with 'marcel_'). Get it from Marcel settings. */
  "apiToken": string,
  /** API URL - Marcel API base URL (leave empty for default production URL) */
  "apiUrl": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `quests` command */
  export type Quests = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `quests` command */
  export type Quests = {}
}

