package com.ucl.ucl.distribution;

import com.ucl.ucl.base.BaseStats;
import jakarta.persistence.*;

@Entity
@Table(name = "player_distribution")
public class PlayerDistribution extends BaseStats {

    @Column(name = "pass_accuracy")
    private Double passAccuracy;

    @Column(name = "passes_attempted")
    private Double passesAttempted;

    @Column(name = "passes_completed")
    private Double passesCompleted;

    @Column(name = "cross_accuracy")
    private Double crossAccuracy;

    @Column(name = "crosses_attempted")
    private Double crossesAttempted;

    @Column(name = "crosses_completed")
    private Double crossesCompleted;

    @Column(name = "free_kicks")
    private Double freeKicks;

    public PlayerDistribution() {}

    public Double getPassAccuracy() {
        return passAccuracy;
    }
    public void setPassAccuracy(Double value) {
        this.passAccuracy = value;
    }

    public Double getPassesAttempted() {
        return passesAttempted;
    }
    public void setPassesAttempted(Double value) {
        this.passesAttempted = value;
    }

    public Double getPassesCompleted() {
        return passesCompleted;
    }
    public void setPassesCompleted(Double value) {
        this.passesCompleted = value;
    }

    public Double getCrossAccuracy() {
        return crossAccuracy;
    }
    public void setCrossAccuracy(Double value) {
        this.crossAccuracy = value;
    }

    public Double getCrossesAttempted() {
        return crossesAttempted;
    }
    public void setCrossesAttempted(Double value) {
        this.crossesAttempted = value;
    }

    public Double getCrossesCompleted() {
        return crossesCompleted;
    }
    public void setCrossesCompleted(Double value) {
        this.crossesCompleted = value;
    }

    public Double getFreeKicks() {
        return freeKicks; 
    }
    public void setFreeKicks(Double value) {
        this.freeKicks = value;
    }
}
