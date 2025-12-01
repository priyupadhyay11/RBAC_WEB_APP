import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface RowData {
  id: number;
  customerName: string;
  contactName: string;
  designation: string;
  zone: string;
  location: string;
  spoc: string;
  requester: string;
  objective: string;
  remarks: string;
  status: string;
  meetingDate: string;
}
@Component({
  selector: 'app-table-component',
  imports: [FormsModule ,CommonModule],
  templateUrl: './table-component.html',
  styleUrl: './table-component.scss',
})
export class TableComponent {

 data: RowData[] = [
    {
      id: 1,
      customerName: "Dell",
      contactName: "John AA",
      designation: "Executive Group President",
      zone: "EURCE",
      location: "Zurich, Switzerland",
      spoc: "Albert Flores",
      requester: "CVK",
      objective: "Lorem Ipsum text",
      remarks: "Lorem Ipsum text",
      status: "Approved",
      meetingDate: "15-Jan-2026"
    },
    {
      id: 2,
      customerName: "AAE",
      contactName: "Jim CC",
      designation: "Chief Executive Officer",
      zone: "EURUK",
      location: "London, UK",
      spoc: "Kate DD",
      requester: "CVK",
      objective: "Lorem Ipsum text",
      remarks: "Lorem Ipsum text",
      status: "Proposed",
      meetingDate: "15-Jan-2026"
    },
    {
      id: 3,
      customerName: "AAE",
      contactName: "Jim CC",
      designation: "Chief Executive Officer",
      zone: "EURCE",
      location: "Amsterdam, Netherlands",
      spoc: "Cameron Williamson",
      requester: "Pawan",
      objective: "Lorem Ipsum text",
      remarks: "Lorem Ipsum text",
      status: "Declined",
      meetingDate: "15-Jan-2026"
    }
  ];
 pageSize = 10;
  currentPage = 1;
  pages: number[] = [];
  showModal = false;
  selectedRow: RowData | null = null;
  remarks: string = "";
 ngOnInit() {
    this.updatePages();
  }
  

  getShowingText(): string {
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.data.length);
    return `Showing ${start} to ${end} of ${this.data.length} entries`;
  }

  getPaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.data.slice(startIndex, endIndex);
  }

 
  formatDateForInput(dateString: string) {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  }


  updateDate(id: number, dateValue: string) {
    this.data = this.data.map((row) =>
      row.id === id ? { ...row, meetingDate: dateValue } : row
    );
  }

  
  openModal(item: RowData) {
    let formattedDate = item.meetingDate;
    const d = new Date(item.meetingDate);
    if (!isNaN(d.getTime())) {
      formattedDate = d.toISOString().split("T")[0];
    }

    this.selectedRow = { ...item, meetingDate: formattedDate };
    this.showModal = true;
  }

  saveRow() {
    if (!this.selectedRow) return;

    this.data = this.data.map((row) =>
      row.id === this.selectedRow!.id ? this.selectedRow! : row
    );

    this.showModal = false;
    this.selectedRow = null;
  }

  closeModal() {
    this.showModal = false;
    this.selectedRow = null;
  }

 
  deleteRow(id: number) {
    this.data = this.data.filter((row) => row.id !== id);
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(start, start + this.pageSize);
  }

 totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  updatePages() {
    const total = this.totalPages();
    this.pages = Array.from({ length: total }, (_, i) => i + 1);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePages();
  }

  changePageSize(event: any) {
    this.pageSize = +event.target.value;
    this.currentPage = 1;
    this.updatePages();
  }
}

