// src/app/components/excel-import/excel-import.component.ts
import { Component } from '@angular/core';
import { ExcelImportService } from '../../services/excel-import.service';
import * as XLSX from 'xlsx'; // Assuming you're using the xlsx package for Excel handling

@Component({
  selector: 'app-excel-import',
  templateUrl: './excel-import.component.html',
  styleUrls: ['./excel-import.component.scss']
})
export class ExcelImportComponent {

  importedData: any[] = []; // Store the imported data here

  constructor(private excelImportService: ExcelImportService) { }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.excelImportService.readExcelFile(file).then(data => {
        console.log('Parsed Data:', data);
        this.importedData = data;
        // Handle the parsed data here (e.g., display it in the UI or process it further)
      }).catch(error => {
        console.error('Error reading file:', error);
      });
    }
  }

  exportDataToExcel() {
    // Convert your data to a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.importedData);

    // Create a new workbook and add the worksheet to it
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ExportedData');

    // Export the workbook as an Excel file
    XLSX.writeFile(wb, 'exported_data.xlsx');
  }
}
