import { Constants } from '../../core/constants/constants';

export interface itemsListModal{
  id:number;
  username:string,
  profilePic:string,
  display: string,
  likes:number,
  comments:number;
  tags:string[]
}

 export const itemsList:itemsListModal[] = [
    {
      id: 1,
      username: 'sai', profilePic: Constants.logo,
      display: Constants.pic1,
      likes: 45,
      comments: 11,
      tags: ["scenary", "mountains"]
     },
    {
      id: 2,
      username: 'ram', profilePic: Constants.logo2,
      display: Constants.pic2,
      likes: 15,
      comments: 32,
      tags: ["scenary", "ocean" ]
     },
    {
      id: 3,
      username: 'prasad', profilePic: Constants.logo,
      display: Constants.pic3,
      likes: 93,
      comments: 2,
      tags: ["scenary",  "river"]
     },
    {
      id: 4,
      username: 'sharma', profilePic: Constants.logo2,
      display: Constants.pic4,
      likes:489 ,
      comments: 1,
      tags: ["scenary", "pond" ]
     },
    {
      id: 5,
      username: 'dinesh', profilePic: Constants.logo,
      display: Constants.pic5,
      likes: 231,
      comments: 5,
      tags: ["scenary", "mountains" ]
     },
    {
      id:6 ,
      username: 'mukesh', profilePic: Constants.logo,
      display: Constants.pic6,
      likes:45 ,
      comments: 23,
      tags: ["scenary", "mountains", "river" ]
     },
    {
      id: 7,
      username: 'naresh', profilePic: Constants.logo,
      display: Constants.pic7,
      likes: 12,
      comments: 9,
      tags: ["scenary", "mountains" ]
     },
    {
      id:8 ,
      username: 'somesh', profilePic: Constants.logo,
      display: Constants.pic8,
      likes:15 ,
      comments: 23,
      tags: ["scenary",  "greenary"]
     },
    {
      id: 9,
      username: 'ganesh', profilePic: Constants.logo,
      display: Constants.pic9,
      likes:23 ,
      comments: 7,
      tags: ["scenary", "canal" ]
     },
    {
      id:10 ,
      username: 'sukesh', profilePic: Constants.logo,
      display: Constants.pic10,
      likes:61 ,
      comments: 1,
      tags: ["scenary", "sunset" ]
     },
  ]


