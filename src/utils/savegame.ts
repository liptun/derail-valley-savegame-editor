import AESDecrypt from "./AESDecrypt";
import { fromBase64, toBase64 } from "./cyberchef/lib/Base64";

const key = "AEILMMHGsFFguLlKwyUZIGTRdEpokqAAjMcvV1boFMI=";
const iv = "pemgail9uzpgzl88";

export const savegameDecodeToJSON = (savegame: string): Promise<string> =>
    new Promise(async (resolve, reject) => {
        const decodedBase64 = fromBase64(savegame);

        try {
            const AESDecrypted = await AESDecrypt({
                input: decodedBase64,
                key,
                iv,
            });
            resolve(AESDecrypted as string);
        } catch (e) {
            reject(e);
        }
    });
export const savegameEncodeFromJSON = (savegame: string) => savegame;