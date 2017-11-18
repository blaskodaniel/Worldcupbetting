import {Input, Output, Directive, ElementRef, Renderer, EventEmitter, OnInit} from '@angular/core'

@Directive({
    selector: '[contenteditable]',
    host: {
        '(input)': 'update($event)'
    }
})
export class contenteditableDirective implements OnInit {
    @Input() myContent;
    @Output() myContentChange: EventEmitter<any> = new EventEmitter();
    
    constructor(private el: ElementRef, private renderer: Renderer) { }

    update(event) {
        this.myContentChange.emit(this.el.nativeElement.innerText);
    }
    
    ngOnInit() {
        this.el.nativeElement.innerText = this.myContent;
    }
}
