import AESDecrypt from "./AESDecrypt";
import AESEncrypt from "./AESEncrypt";
import { fromBase64, toBase64 } from "./cyberchef/Base64";

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
        } catch (_) {
            reject("Unable to read savegame file");
        }
    });

export const savegameEncodeFromJSON = (savegame: any) => {
    const jsonString = JSON.stringify(savegame);
    const AESEncrypted = AESEncrypt({ input: jsonString, key, iv });
    const encodeBase64 = toBase64(AESEncrypted);
    return encodeBase64;
};
