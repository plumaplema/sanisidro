import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { TextEncoder, TextDecoder } from "util";
import { Action } from 'eosjs/dist/eosjs-serialize'
import fetch from 'node-fetch';

export function getRpcEndpoint() {
    const rpc_endpoint = ["https://wax-testnet.eosphere.io", "https://api.waxtest.waxgalaxy.io", "https://waxtestnet.ledgerwise.io", "https://testnet-wax.3dkrender.com"]
    const randomIndex = Math.floor(Math.random() * rpc_endpoint.length);
    const item = rpc_endpoint[randomIndex];
    return item;
}

const makeTransaction = (actions: Action[]) => {
    const cloneAction = actions.map(act => act)
    const defaultPrivateKey = process.env.KEY;
    const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
    const url = getRpcEndpoint()
    const rpc = new JsonRpc(url, { fetch });
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
    return api.transact(
        {
            actions: cloneAction,
        },
        {
            blocksBehind: 3,
            expireSeconds: 30,
        }
    );
}

export default async function transact(actions: Action[], tries = 0) {
    let result;
    try {
        result = await makeTransaction(actions);
    } catch (e) {
        if (tries < 4)
            return transact(actions, tries + 1);
        throw e;
    }
    return result;
}