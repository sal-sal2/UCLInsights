package com.ucl.ucl.attempts;

import com.ucl.ucl.base.BaseStats;
import jakarta.persistence.*;

@Entity
@Table(name = "player_attempts")
public class PlayerAttempts extends BaseStats {

    @Column(name = "attempts_total")
    private Double attemptsTotal;

    @Column(name = "attempts_on_target")
    private Double attemptsOnTarget;

    @Column(name = "attempts_off_target")
    private Double attemptsOffTarget;

    @Column(name = "attempts_blocked")
    private Double attemptsBlocked;

    public PlayerAttempts(){
    }

    public Double getAttemptsTotal() {
        return attemptsTotal;
    }
    public void setAttemptsTotal(Double value) {
        this.attemptsTotal = value; 
    }

    public Double getAttemptsOnTarget() {
        return attemptsOnTarget; 
    }
    public void setAttemptsOnTarget(Double value) {
        this.attemptsOnTarget = value;
    }

    public Double getAttemptsOffTarget() {
        return attemptsOffTarget;
     }
    public void setAttemptsOffTarget(Double value) {
        this.attemptsOffTarget = value;
    }

    public Double getAttemptsBlocked() {
        return attemptsBlocked;
    }
    public void setAttemptsBlocked(Double value) {
        this.attemptsBlocked = value;
    }
}
