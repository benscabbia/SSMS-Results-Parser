export class DataService {

    ssmsInput = {};

    resetInput(){
        this.ssmsInput = {};
    }

    dummyData = `
    Id,Name
    1,Chauncy
    2,Ploom
    
    (2 row(s) affected)
    
    Id,FirstName,LastName,Gender,SchoolID
    1,John,Knight,0,1
    2,Amy,Smith,1,1
    3,Becca,Jonson,1,2
    4,Rob,Tyler,0,2
    5,Mark,Pop,0,2
    
    (5 row(s) affected)
    
    Id,Name,Id,FirstName,LastName,Gender,SchoolID
    1,Chauncy,1,John,Knight,0,1
    1,Chauncy,2,Amy,Smith,1,1
    2,Ploom,3,Becca,Jonson,1,2
    2,Ploom,4,Rob,Tyler,0,2
    2,Ploom,5,Mark,Pop,0,2
    
    (5 row(s) affected)
    `;
}