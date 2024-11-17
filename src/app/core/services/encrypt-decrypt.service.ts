import { Injectable } from '@angular/core';
import * as cryptoJS from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  secretKey = 'dsfewrkiucx,xmnewi'

  constructor() { }

  encrypt(text:string):string{
    return cryptoJS.AES.encrypt(text,this.secretKey ).toString()
  }

  decrypt(cipher:string):string{
    return cryptoJS.AES.decrypt(cipher, this.secretKey).toString(cryptoJS.enc.Utf8)
  }


}
