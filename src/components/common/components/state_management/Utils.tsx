export default function getStorageItemKey(salt: string, key: string): string {
    return salt + key
}
