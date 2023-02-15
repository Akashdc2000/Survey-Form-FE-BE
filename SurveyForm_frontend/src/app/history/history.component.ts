import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllservicesService } from '../allservices.service';
import * as XLSX from 'xlsx';
import * as JsonToXML from 'js2xmlparser';
import { FileSaverService } from 'ngx-filesaver';
import {ngxCsv} from 'ngx-csv/ngx-csv.js';

export interface Survey2 {
  question: string;
  answertype: string;
  options: string[];
}

export interface Survey {
  _id: string;
  userid: string;
  title: string;
  email: string;
  survey: Survey2[];
}

export class HistoryRootObject {
  message: string="";
  Survey: Survey[]=[];
}


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit{
  public data:any;
  public url: String = '';
  public userID: String = '';

  constructor(
    public allservices:AllservicesService,
    private route: Router
  ){
  }

  ngOnInit() {

      if(!localStorage.getItem('token'))
        this.route.navigate(['/signin']);

    //To get a UserID from URL
    this.url = (this.route.routerState.snapshot.url)
    this.userID = this.url.split('/')[2]

    this.allservices.getAllSurveyofUser(this.userID).subscribe((response: HistoryRootObject) => {
      // console.log(response);
      this.data = response;
      console.log(this.data.Survey)
    });


  }


  //Delete Survey By Survey ID
  deleteSurvey(survey_id:any){
    this.allservices.deleteSurveyBySurveyID(survey_id).subscribe(response=>{
      console.log(response);
      location.reload();
    })
    alert(survey_id+" Deleted ...")  
  }

  //Publish Survey Link
  publishlink(survey_id:any){
    alert('http://localhost:4200/dynamic/'+survey_id)
    window.open('http://localhost:4200/dynamic/'+survey_id,'_blank')
  }

  //Get All Responses
  getAllResponsesBy(survey_id:any){
    this.downloadByCSV(survey_id);
    alert("All Responses of Survey ID "+survey_id)
    window.open(`http://localhost:4200/survey_responses/${survey_id}`)
  }


  //Download REsponses in Xsl Format
  // downloadResponses(survey_id:any)
  //   {
  //     const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //     const EXCEL_EXTENSION=".xlsx";
  
  //     const worksheet = XLSX.utils.json_to_sheet(this.jsonData);
  //     const worksheet1 = JsonToXML.parse("person",this.jsonData);
  //     console.log(worksheet1);
  //     // const worksheet = JsonToXML.parse(`${this.userId}` , this.jsonData);
  
  //     //JSON To ExcelSheet Conversion
  //     const workbook = {
  //       Sheets:{
  //         'testingSheet':worksheet
  //       },
  //       SheetNames:['testingSheet']
  //     }
  
  //     const excelBuffer =  XLSX.write(workbook,{bookType:'xlsx',type:'array'});
  
  //     //Download File In Excel Format
  
  //     const blogData = new Blob([excelBuffer],{type:EXCEL_TYPE});
  
  //     // // Saving File Using File Saver
  //     this.fileSaver.save(blogData,`${this.userId}`);
  
  //     // console.log(Object.entries(this.jsonData));
  
  
  //   }
  

  
    downloadByCSV(survey_id:any)
    {
      this.allservices.getAllResponsesBySurveyID(survey_id).subscribe(response=>{
        console.log(response.Responses);

        var option ={
          title : 'Survey Form',
          fieldSeparator : ',',
          quoteStrings :'"',
          decimalseparator : '.',
          showLabels : false,
          noDownload : false,
          showTitle : false,
          useBom : false,
          headers : ['title' , 'email',"survey:[{}]"]
        };
    
        new ngxCsv(response.Responses,"report",option);
      })
      
  }

}
