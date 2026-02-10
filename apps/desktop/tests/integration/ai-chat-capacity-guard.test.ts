import assert from "node:assert/strict";

import type { IpcMain } from "electron";

import type { Logger } from "../../main/src/logging/logger";
import { registerAiIpcHandlers } from "../../main/src/ipc/ai";

type Handler = (event: unknown, payload: unknown) => Promise<unknown>;

function createLogger(): Logger {
  return {
    logPath: "<test>",
    info: () => {},
    error: () => {},
  };
}

const handlers = new Map<string, Handler>();
const ipcMain = {
  handle: (channel: string, listener: Handler) => {
    handlers.set(channel, listener);
  },
} as unknown as IpcMain;

registerAiIpcHandlers({
  ipcMain,
  db: null,
  userDataDir: "<test-user-data>",
  builtinSkillsDir: "<test-skills>",
  logger: createLogger(),
  env: process.env,
});

const chatSend = handlers.get("ai:chat:send");
const chatList = handlers.get("ai:chat:list");

assert.ok(chatSend, "expected ai:chat:send handler");
assert.ok(chatList, "expected ai:chat:list handler");

const projectId = "project-chat-capacity";

for (let i = 1; i <= 2000; i += 1) {
  const response = (await chatSend?.(
    {},
    { projectId, message: `message-${i}` },
  )) as {
    ok: boolean;
  };
  assert.equal(response.ok, true);
}

const overflow = (await chatSend?.(
  {},
  { projectId, message: "message-overflow" },
)) as {
  ok: boolean;
  error?: { code?: string; message?: string };
};

assert.equal(overflow.ok, false);
if (overflow.ok) {
  assert.fail("expected overflow request to be blocked");
}

assert.equal(overflow.error?.code, "CONFLICT");
assert.match(String(overflow.error?.message ?? ""), /归档|archive/i);

const listed = (await chatList?.({}, { projectId })) as {
  ok: boolean;
  data?: { items: Array<{ content: string }> };
};

assert.equal(listed.ok, true);
assert.equal(listed.data?.items.length, 2000);
assert.equal(listed.data?.items[0]?.content, "message-1");
assert.equal(listed.data?.items[1999]?.content, "message-2000");
