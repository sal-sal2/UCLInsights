package com.ucl.ucl.defending;

import com.ucl.ucl.base.BaseStats;
import jakarta.persistence.*;

@Entity
@Table(name = "player_defending")
public class PlayerDefending extends BaseStats {

    @Column(name = "balls_recovered")
    private Double ballsRecovered;

    @Column(name = "tackles_total")
    private Double tacklesTotal;

    @Column(name = "tackles_won")
    private Double tacklesWon;

    @Column(name = "tackles_lost")
    private Double tacklesLost;

    @Column(name = "clearances")
    private Double clearances;

    public PlayerDefending() {}

    public Double getBallsRecovered() {
        return ballsRecovered;
    }
    public void setBallsRecovered(Double value) {
        this.ballsRecovered = value;
    }

    public Double getTacklesTotal() {
        return tacklesTotal; 
    }
    public void setTacklesTotal(Double value) {
        this.tacklesTotal = value;
    }

    public Double getTacklesWon() {
        return tacklesWon;
    }
    public void setTacklesWon(Double value) {
        this.tacklesWon = value;
    }

    public Double getTacklesLost() {
        return tacklesLost;
    }
    public void setTacklesLost(Double value) {
        this.tacklesLost = value;
    }

    public Double getClearances() {
        return clearances; 
    }
    public void setClearances(Double value) {
        this.clearances = value;
    }
}
