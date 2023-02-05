import { AES } from "crypto-js";

export function encryptTokenId(tokenId, key)
{
    var ciphertext = AES.encrypt(tokenId, key);
    return ciphertext.toString();
}