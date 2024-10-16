export class CreatePropertyDto {
    readonly title: string;
    readonly description: string;
    readonly price: number;
    readonly availabilityDate: Date;
    readonly photos: string[];
}
