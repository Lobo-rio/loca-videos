export class Slug {
    public value: string

    constructor(value: string) {
        this.value = value
    }

    /**
     * Receives a string and normalize it as a slug
     * 
     * Example: Ah Example Title" => "an-example-title"
     * 
     * @param text {string}
     */

    static createFromtext(text: string) {
        const slugText = text
            .normalize("NFKD")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/_/g, '-')
            .replace(/--+/g, '-')
            .replace(/-$/g, '')
        
        return new Slug(slugText)
            
    }
}