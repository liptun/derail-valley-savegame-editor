import AESDecrypt from "./cyberchef/AESDecrypt";
import { fromBase64, toBase64 } from "./cyberchef/lib/Base64";

export const savegameDecodeToJSON = (savegame: string) => {
    const decodedBase64 = fromBase64(savegame);
    const AESCipher = new AESDecrypt();
    
    return decodedBase64;
};
export const savegameEncodeFromJSON = (savegame: string) => savegame;
