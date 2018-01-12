import { Component, OnInit, Input } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() lancamentos : any ;  
  @Input() filtro : any ; 

  totalRegistros: any;

  aoMudarPagina(event: LazyLoadEvent){
    const pagina = event.first / event.rows;    
  }
  
}
