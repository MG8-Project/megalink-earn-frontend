export {};

declare global {
  interface Window {
    ethereum: any,
	  Cypress: unknown;
    JavaScriptChannel: any;
    myMessage: any;
  }
}