import { Books } from "./mock-book";
import { Page } from "../models/page";

export const Pages: Page[] = [
    {
        id:1,
        title: "Titre",
        content: "Contenu de la page",
        createdAt: new Date(),
        updatedAt: null,
        book: Books[0],
    },
    {
        id:2,
        title: "Titre",
        content: "Contenu de la page",
        createdAt: new Date(),
        updatedAt: null,
        book: Books[0],
    },
    {
        id:3,
        title: "Titre",
        content: "Contenu de la page",
        createdAt: new Date(),
        updatedAt: null,
        book: Books[0],
    }
]