import {
  sleep,
  clickRefUntilRefFound,
  ensureStateChange,
  screenVSRefDiff,
  causeEffect,
  conditionGenerator,
  actionGenerator,
} from "./execution";
import { pncRefs } from "../reference";

async function transitionNeuralSearch() {
  await ensureStateChange(pncRefs.get("00_transitions/open_navmenu")!);
  await ensureStateChange(pncRefs.get("00_transitions/neural_search")!);
}

async function basicSearch() {
  await clickRefUntilRefFound(
    pncRefs.get("04_basic_search/neural_search_next_banner")!,
    pncRefs.get("04_basic_search/basic_search")!
  );

  console.log("on basic search");

  await ensureStateChange(pncRefs.get("04_basic_search/basic_search_10")!, 0.3);
  console.log("Basic searching");

  while (
    (await screenVSRefDiff(
      pncRefs.get("04_basic_search/basic_search_insufficient")!,
      true
    )) > 0.05
  ) {
    await ensureStateChange(pncRefs.get("04_basic_search/basic_search_skip")!);
    await ensureStateChange(
      pncRefs.get("04_basic_search/basic_search_results")!
    );
    await ensureStateChange(
      pncRefs.get("04_basic_search/basic_search_10")!,
      0.1
    );
  }
  await ensureStateChange(
    pncRefs.get("04_basic_search/basic_search_insufficient_confirm")!
  );
}

async function awayTooLong() {
  await causeEffect(
    conditionGenerator(pncRefs, "01_login/away_too_long_notification"),
    actionGenerator(pncRefs, "01_login/away_too_long_notification_confirm")
  );
}

async function login() {
  await causeEffect(
    conditionGenerator(pncRefs, "01_login/game_start"),
    actionGenerator(pncRefs, "01_login/game_start")
  );
}

async function announcements() {
  await causeEffect(
    conditionGenerator(pncRefs, "02_announcements/event_notice"),
    actionGenerator(pncRefs, "02_announcements/event_notice_close")
  );

  await causeEffect(
    conditionGenerator(pncRefs, "02_announcements/login_reward"),
    actionGenerator(pncRefs, "02_announcements/login_reward_close")
  );
  await causeEffect(
    conditionGenerator(pncRefs, "02_announcements/login_reward"),
    actionGenerator(pncRefs, "02_announcements/login_reward_close")
  );

  await causeEffect(
    conditionGenerator(pncRefs, "02_announcements/monthly_sign_in"),
    actionGenerator(pncRefs, "02_announcements/monthly_sign_in_close")
  );

  await causeEffect(
    conditionGenerator(pncRefs, "02_announcements/event_notice_2_close"),
    actionGenerator(pncRefs, "02_announcements/event_notice_2_close")
  );
}

async function factory() {
  await causeEffect(
    conditionGenerator(pncRefs, "03_factory_collection/open_factory"),
    actionGenerator(pncRefs, "03_factory_collection/open_factory")
  );
}

async function pnc() {
  console.log(
    await screenVSRefDiff(
      pncRefs.get("04_basic_search/basic_search_insufficient")!
    )
  );
}

// pnc();
// basicSearch();
// awayTooLong()
// login();
// announcements();
factory();

// More execution type functions needed
// Click until image found exists - Navigating Neural Search Tabs
// Click and drag - Factory Production

// You check a condition and click elsewhere
