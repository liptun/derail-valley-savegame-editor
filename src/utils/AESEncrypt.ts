import Utils from "./cyberchef/Utils";
import forge from "node-forge";

interface Props {
    input: string;
    key: string;
    iv: string;
}

const AESEncrypt = ({ input, key, iv }: Props) => {
    const cipher = forge.cipher.createCipher(
        "AES-CBC",
        Utils.convertToByteString(key, "Base64")
    );
    cipher.start({
        iv: Utils.convertToByteString(iv, "UTF8"),
    });
    cipher.update(
        forge.util.createBuffer(Utils.convertToByteString(input, "RAW"))
    );
    cipher.finish();

    return cipher.output.getBytes();
};

export default AESEncrypt;
