import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Battle } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BattleService {
  private apiUrl = 'http://localhost:3000/api/battles';

  constructor(private http: HttpClient) {}

  getBattles(): Observable<Battle[]> {
    return this.http.get<Battle[]>(this.apiUrl);
  }

  getBattle(id: string): Observable<Battle> {
    return this.http.get<Battle>(`${this.apiUrl}/${id}`);
  }

  createBattle(battle: Battle): Observable<Battle> {
    return this.http.post<Battle>(this.apiUrl, battle);
  }

  updateBattle(id: string, battle: Battle): Observable<Battle> {
    return this.http.put<Battle>(`${this.apiUrl}/${id}`, battle);
  }

  deleteBattle(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
