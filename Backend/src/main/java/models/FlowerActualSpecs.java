package models;

import enums.RequiredActionsEnum;

public class FlowerActualSpecs {
    private int humidityPercent;
    private int temperatureCelsiusGrades;
    private int daysPassedFromPlantedDate;
    private String actionRequired;

    public FlowerActualSpecs(int humidityPercent, int temperatureCelsiusGrades, int daysPassedFromPlantedDate, String actionRequired) {
        this.humidityPercent = humidityPercent;
        this.temperatureCelsiusGrades = temperatureCelsiusGrades;
        this.daysPassedFromPlantedDate = daysPassedFromPlantedDate;
        this.actionRequired = actionRequired;
    }

    public FlowerActualSpecs() {
    }

    public int getHumidityPercent() {
        return humidityPercent;
    }

    public void setHumidityPercent(int humidityPercent) {
        this.humidityPercent = humidityPercent;
    }

    public int getTemperatureCelsiusGrades() {
        return temperatureCelsiusGrades;
    }

    public void setTemperatureCelsiusGrades(int temperatureCelsiusGrades) {
        this.temperatureCelsiusGrades = temperatureCelsiusGrades;
    }

    public int getDaysPassedFromPlantedDate() {
        return daysPassedFromPlantedDate;
    }

    public void setDaysPassedFromPlantedDate(int daysPassedFromPlantedDate) {
        this.daysPassedFromPlantedDate = daysPassedFromPlantedDate;
    }

    public String getActionRequired() {
        return actionRequired;
    }

    public void setActionRequired(String actionRequired) {
        this.actionRequired = actionRequired;
    }
}
