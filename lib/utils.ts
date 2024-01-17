import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatPhone(number: string | number, format?: 'hyphen' | 'dot' | 'formal'): string {
    const start = number.toString().slice(0, 3)
    const middle = number.toString().slice(3, 6)
    const end = number.toString().slice(6, 10)

    let output
    switch (format) {
        case 'formal':
            output = `(${start}) ${middle}-${end}`
            break
        case 'hyphen':
            output = `${start}-${middle}-${end}`
            break
        case 'dot':
            output = `${start}.${middle}.${end}`
            break
        default:
            output = `${start}.${middle}.${end}`
    }

    return output
}

export function formatDate(input: string | number): string {
    const date = new Date(input)
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
}

export function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}