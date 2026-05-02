package com.ucl.ucl.goals;

import com.ucl.ucl.base.BaseStats;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "player_goals")
public class PlayerGoals extends BaseStats{
    @Column(name = "goals")
    private Double goals;

    @Column(name = "goals_right_foot")
    private Double goalsRightFoot;

    @Column(name = "goals_left_foot")
    private Double goalsLeftFoot;

    @Column(name = "goals_head")
    private Double goalsHead;

    @Column(name = "goals_other")
    private Double goalsOther;

    @Column(name = "goals_inside_area")
    private Double goalsInsideArea;

    @Column(name = "goals_outside_area")
    private Double goalsOutsideArea;

    @Column(name = "penalties_scored")
    private Double penaltiesScored;

    @Column(name = "matches_played")
    private Double matchesPlayed;

    public PlayerGoals(){

    }

    public Double getGoals() {
        return goals; 
    }
    public void setGoals(Double goals) {
        this.goals = goals;
    }

    public Double getGoalsRightFoot() {
        return goalsRightFoot;
    }
    public void setGoalsRightFoot(Double value) {
        this.goalsRightFoot = value;
    }

    public Double getGoalsLeftFoot() {
        return goalsLeftFoot;
    }
    public void setGoalsLeftFoot(Double value) {
        this.goalsLeftFoot = value;
    }

    public Double getGoalsHead() {
        return goalsHead;
    }
    public void setGoalsHead(Double value) {
        this.goalsHead = value;
    }

    public Double getGoalsOther() {
        return goalsOther; 
    }
    public void setGoalsOther(Double value) {
        this.goalsOther = value;
    }

    public Double getGoalsInsideArea() {
        return goalsInsideArea;
    }
    public void setGoalsInsideArea(Double value) {
        this.goalsInsideArea = value;
    }

    public Double getGoalsOutsideArea() {
        return goalsOutsideArea;
    }
    public void setGoalsOutsideArea(Double value) {
        this.goalsOutsideArea = value;
    }

    public Double getPenaltiesScored() {
        return penaltiesScored;
    }
    public void setPenaltiesScored(Double value) {
        this.penaltiesScored = value;
    }

    public Double getMatchesPlayed() {
        return matchesPlayed; 
    }
    public void setMatchesPlayed(Double value) {
        this.matchesPlayed = value;
    }
    
}
