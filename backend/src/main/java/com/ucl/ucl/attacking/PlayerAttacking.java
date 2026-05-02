package com.ucl.ucl.attacking;

import com.ucl.ucl.base.BaseStats;
import jakarta.persistence.*;


@Entity
@Table(name = "player_attacking")
public class PlayerAttacking extends BaseStats {

    @Column(name = "assists")
    private Double assists;

    @Column(name = "corners")
    private Double corners;

    @Column(name = "offsides")
    private Double offsides;

    @Column(name = "dribbles")
    private Double dribbles;

    public PlayerAttacking() {
    }

    public Double getAssists() {
        return assists;
    }
    public void setAssists(Double value) {
        this.assists = value;
    }

    public Double getCorners() {
        return corners; 
    }
    public void setCorners(Double value) {
        this.corners = value;
    }

    public Double getOffsides() {
        return offsides; 
    }
    public void setOffsides(Double value) {
        this.offsides = value;
    }

    public Double getDribbles() {
        return dribbles; 
    }
    public void setDribbles(Double value) {
        this.dribbles = value;
    }
}
