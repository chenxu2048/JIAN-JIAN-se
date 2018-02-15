import { manager } from './Manager';

export class Connection {
  constructor(clientId, namespace) {
    this.clientId = clientId;
    this.namespace = namespace;
    this.client = manager.getClient(clientId);
  }

  genKey(key) {
    return `${this.namespace}:${key}`;
  }
}
