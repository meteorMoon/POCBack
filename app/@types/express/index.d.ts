console.log("Starting");

declare namespace Express{
    export interface Request {
        userId: integer;
    }
}