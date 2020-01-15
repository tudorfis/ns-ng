import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { take } from 'rxjs/operators';
import { Challenge } from "./challenge.model";
import { DayStatus } from "./day.model";

@Injectable({
    providedIn: 'root'
})
export class ChallengeService {
    private _currentChallenge = new BehaviorSubject<Challenge>(null);

    get currentChallenge() {
        return this._currentChallenge.asObservable();
    }

    createNewChallenge(title: string, description: string) {
        const newChallenge = new Challenge(
            title,
            description,
            new Date().getFullYear(),
            new Date().getMonth()
        )
        // Save it to server
        this._currentChallenge.next(newChallenge);
    }

    updateDayStatus(dayInMonth: number, status: DayStatus) {
        // console.log('dayInMonth', dayInMonth);
        // console.log('status', status);

        this._currentChallenge.pipe(take(1)).subscribe((challenge: Challenge) => {
            if (!challenge || challenge.days.length < dayInMonth) {
                return;
            }
            const dayIndex = challenge.days.findIndex(
                d => d.dayInMonth === dayInMonth
            );
            challenge.days[dayIndex].status = status;
            this._currentChallenge.next(challenge);

            console.log('challenge.days[dayIndex]', challenge.days[dayIndex]);
            // Save this to a server
        });
    }

}
