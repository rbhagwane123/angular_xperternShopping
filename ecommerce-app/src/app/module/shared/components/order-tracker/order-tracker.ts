import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-order-tracker',
  imports: [CommonModule, MatIconModule, MatDivider],
  templateUrl: './order-tracker.html',
  styleUrl: './order-tracker.scss',
})
export class OrderTracker {
  @Input() activeStep: any;
  @Input() steps: any;
  
}
