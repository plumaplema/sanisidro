import { JsonRpc } from 'eosjs';

export function getRpcEndpoint() {
    const rpc_endpoint = ["https://wax-testnet.eosphere.io", "https://api.waxtest.waxgalaxy.io", "https://waxtestnet.ledgerwise.io", "https://testnet-wax.3dkrender.com"]
    const randomIndex = Math.floor(Math.random() * rpc_endpoint.length);
    const item = rpc_endpoint[randomIndex];
    return item;
}

export const Jsonrpc = () => {
    const url = getRpcEndpoint()
    const rpc = new JsonRpc(url);
    return rpc
}