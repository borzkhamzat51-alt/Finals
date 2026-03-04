import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BattleService } from '../../services/book.service';
import { Battle } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BattleFormComponent implements OnInit {
  isEditMode = false;
  battleId = '';
  loading = false;
  submitting = false;
  error = '';

  battleTypes = ['1-on-1', 'Dos por Dos', 'Tres por Tres', 'Iron Mic', 'URL Style', 'Femcee', 'Exhibition'];

  events = [
    'AHON', 'FLIPTOP LIVE', 'ISABUHAY', 'METRO', 'AWAY DAYS',
    'HULING LABAN', 'BLACKOUT', 'TAKEOVER', 'BATTLE ROYALE', 'OTHER'
  ];

  battle: Battle = {
    rapper1: '',
    rapper2: '',
    event: '',
    venue: '',
    date: '',
    battleType: '',
    winner: 'TBD',
    notes: '',
  };

  constructor(
    private battleService: BattleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.battleId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.battleId) {
      this.isEditMode = true;
      this.loadBattle();
    }
  }

  loadBattle(): void {
    this.loading = true;
    this.battleService.getBattle(this.battleId).subscribe({
      next: (data) => { this.battle = data; this.loading = false; },
      error: () => { this.error = 'Failed to load battle data.'; this.loading = false; }
    });
  }

  onSubmit(): void {
    this.submitting = true;
    this.error = '';
    const op = this.isEditMode
      ? this.battleService.updateBattle(this.battleId, this.battle)
      : this.battleService.createBattle(this.battle);

    op.subscribe({
      next: () => this.router.navigate(['/battles']),
      error: (err) => {
        this.error = err.error?.message ?? 'Failed to save battle. Check all required fields.';
        this.submitting = false;
      }
    });
  }
}
