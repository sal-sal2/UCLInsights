package com.ucl.ucl.disciplinary;

import com.ucl.ucl.base.BaseStats;
import jakarta.persistence.*;


@Entity
@Table(name = "player_disciplinary")
public class PlayerDisciplinary extends BaseStats {

    @Column(name = "fouls_committed")
    private Double foulsCommitted;

    @Column(name = "fouls_suffered")
    private Double foulsSuffered;

    @Column(name = "yellow_cards")
    private Double yellowCards;

    @Column(name = "red_cards")
    private Double redCards;

    @Column(name = "minutes_played")
    private Double minutesPlayed;

    public PlayerDisciplinary() {}

    public Double getFoulsCommitted(){
        return foulsCommitted;
    }
    public void setFoulsCommitted(Double value) {
        this.foulsCommitted = value;
    }

    public Double getFoulsSuffered() {
        return foulsSuffered;
    }
    public void setFoulsSuffered(Double value) {
        this.foulsSuffered = value;
    }

    public Double getYellowCards() {
        return yellowCards;
    }
    public void setYellowCards(Double value) {
        this.yellowCards = value;
    }

    public Double getRedCards() {
        return redCards;
    }
    public void setRedCards(Double value) {
        this.redCards = value;
    }

    public Double getMinutesPlayed() {
        return minutesPlayed; 
    }
    public void setMinutesPlayed(Double value) {
        this.minutesPlayed = value;
    }
}
