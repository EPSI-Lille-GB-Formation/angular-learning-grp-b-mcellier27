export class Book{
    constructor(
        public id:number,
        public title:string,
        public resume:string,
        public image:string,
        public createdAt : Date,
        public updatedAt : Date|null,
        public user : number
    ){
        this.createdAt = new Date()
    }   
}