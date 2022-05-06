export const sanitizedUrl = (url: string) => {
    if (url) {
        return url.split('/api/v2')[1]
    }
    return null
}
