/**
 * List of Snippet use to refresh stateT
 * @type {{
 * inProgressSnippet: {inProgress: boolean, success: boolean, fail: boolean},
  * successSnippet: {inProgress: boolean, success: boolean, fail: boolean},
  * failSnippet: {inProgress: boolean, success: boolean, fail: boolean},
  * initSnippet: {success: boolean, fail: boolean}
 * }}
 */
module.exports = {
  inProgressSnippet: {
    inProgress: true,
    success: false,
    fail: false,
  },
  successSnippet: {
    inProgress: false,
    success: true,
    fail: false,
  },
  failSnippet: {
    inProgress: false,
    success: false,
    fail: true,
  },
  initSnippet: {
    success: false,
    fail: false,
  },
};
