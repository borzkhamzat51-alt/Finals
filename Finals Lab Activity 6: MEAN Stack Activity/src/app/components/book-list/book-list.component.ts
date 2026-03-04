import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BattleService } from '../../services/book.service';
import { Battle } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BattleListComponent implements OnInit {
  battles: Battle[] = [];
  loading = true;
  error = '';
  successMessage = '';

  constructor(private battleService: BattleService) {}

  ngOnInit(): void { this.loadBattles(); }

  loadBattles(): void {
    this.loading = true;
    this.battleService.getBattles().subscribe({
      next: (data) => { this.battles = data; this.loading = false; },
      error: () => { this.error = 'Failed to load battles. Make sure the API is running on port 3000.'; this.loading = false; }
    });
  }

  deleteBattle(id: string, rapper1: string, rapper2: string): void {
    if (!confirm(`Remove "${rapper1} vs ${rapper2}"? This cannot be undone.`)) return;
    this.battleService.deleteBattle(id).subscribe({
      next: () => {
        this.battles = this.battles.filter(b => b._id !== id);
        this.successMessage = `"${rapper1} vs ${rapper2}" removed from records.`;
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: () => { this.error = 'Failed to delete battle.'; }
    });
  }

  getTypeClass(type: string): string {
    const map: Record<string, string> = {
      '1-on-1':       'type-red',
      'Dos por Dos':  'type-yellow',
      'Tres por Tres':'type-blue',
      'Iron Mic':     'type-purple',
      'URL Style':    'type-green',
      'Femcee':       'type-pink',
    };
    return map[type] ?? 'type-default';
  }

  getWinnerClass(winner: string): string {
    if (!winner || winner === 'TBD') return 'winner-tbd';
    return 'winner-set';
  }
}
