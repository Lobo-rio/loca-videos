import { UseCaseError } from "@/core/errors/use-case-error";

export class ResourceExistedError extends Error implements UseCaseError{
    constructor() {
        super('Resource existed!')
    }
}