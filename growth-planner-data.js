// Generated from growth_planner.pkl - crop profiles, stage templates and planning constants.
window.GROWTH_PLANNER_DATA = {
  "schema_version": 2,
  "profiles": {
    "rice": {
      "group": "cereal",
      "cost": 28000,
      "water_mm": 1150,
      "duration_days": 120,
      "yield_per_acre": 22,
      "price_per_qtl": 2300,
      "msp_backed": true,
      "labour_days": 42,
      "price_volatility": "low",
      "season": "kharif"
    },
    "maize": {
      "group": "cereal",
      "cost": 20000,
      "water_mm": 600,
      "duration_days": 95,
      "yield_per_acre": 24,
      "price_per_qtl": 2200,
      "msp_backed": true,
      "labour_days": 30,
      "price_volatility": "medium"
    },
    "wheat": {
      "group": "cereal",
      "cost": 20000,
      "water_mm": 550,
      "duration_days": 125,
      "yield_per_acre": 18,
      "price_per_qtl": 2400,
      "msp_backed": true,
      "labour_days": 28,
      "price_volatility": "low",
      "season": "rabi"
    },
    "barley": {
      "group": "cereal",
      "cost": 17000,
      "water_mm": 450,
      "duration_days": 120,
      "yield_per_acre": 16,
      "price_per_qtl": 1900,
      "msp_backed": true,
      "labour_days": 24,
      "price_volatility": "low",
      "season": "rabi",
      "note": "hardier and thirstier-tolerant than wheat; thinner market"
    },
    "millet": {
      "group": "cereal",
      "cost": 12000,
      "water_mm": 350,
      "duration_days": 85,
      "yield_per_acre": 10,
      "price_per_qtl": 2600,
      "msp_backed": true,
      "labour_days": 22,
      "price_volatility": "medium",
      "season": "kharif",
      "note": "very drought-hardy; good low-rainfall fallback"
    },
    "chickpea": {
      "group": "pulse",
      "cost": 15000,
      "water_mm": 350,
      "duration_days": 110,
      "yield_per_acre": 8,
      "price_per_qtl": 5400,
      "msp_backed": true,
      "labour_days": 24,
      "price_volatility": "medium",
      "season": "rabi",
      "n_fixing": true
    },
    "kidneybeans": {
      "group": "pulse",
      "cost": 18000,
      "water_mm": 400,
      "duration_days": 95,
      "yield_per_acre": 6,
      "price_per_qtl": 7000,
      "msp_backed": false,
      "labour_days": 28,
      "price_volatility": "high",
      "n_fixing": true
    },
    "pigeonpeas": {
      "group": "pulse",
      "cost": 15000,
      "water_mm": 450,
      "duration_days": 165,
      "yield_per_acre": 7,
      "price_per_qtl": 7000,
      "msp_backed": true,
      "labour_days": 30,
      "price_volatility": "medium",
      "season": "kharif",
      "n_fixing": true
    },
    "mothbeans": {
      "group": "pulse",
      "cost": 10000,
      "water_mm": 300,
      "duration_days": 75,
      "yield_per_acre": 4,
      "price_per_qtl": 6000,
      "msp_backed": false,
      "labour_days": 18,
      "price_volatility": "high",
      "season": "kharif",
      "n_fixing": true,
      "note": "very drought-hardy"
    },
    "mungbean": {
      "group": "pulse",
      "cost": 12000,
      "water_mm": 350,
      "duration_days": 65,
      "yield_per_acre": 5,
      "price_per_qtl": 7800,
      "msp_backed": true,
      "labour_days": 20,
      "price_volatility": "medium",
      "n_fixing": true
    },
    "blackgram": {
      "group": "pulse",
      "cost": 12000,
      "water_mm": 350,
      "duration_days": 80,
      "yield_per_acre": 5,
      "price_per_qtl": 6900,
      "msp_backed": true,
      "labour_days": 20,
      "price_volatility": "medium",
      "n_fixing": true
    },
    "lentil": {
      "group": "pulse",
      "cost": 13000,
      "water_mm": 350,
      "duration_days": 110,
      "yield_per_acre": 6,
      "price_per_qtl": 6400,
      "msp_backed": true,
      "labour_days": 22,
      "price_volatility": "medium",
      "season": "rabi",
      "n_fixing": true
    },
    "soybean": {
      "group": "pulse",
      "cost": 18000,
      "water_mm": 500,
      "duration_days": 100,
      "yield_per_acre": 10,
      "price_per_qtl": 4600,
      "msp_backed": true,
      "labour_days": 26,
      "price_volatility": "medium",
      "season": "kharif",
      "n_fixing": true
    },
    "groundnut": {
      "group": "pulse",
      "cost": 25000,
      "water_mm": 550,
      "duration_days": 110,
      "yield_per_acre": 8,
      "price_per_qtl": 6800,
      "msp_backed": true,
      "labour_days": 40,
      "price_volatility": "medium",
      "n_fixing": true,
      "note": "digging at harvest is labour-heavy"
    },
    "cotton": {
      "group": "cash",
      "cost": 30000,
      "water_mm": 750,
      "duration_days": 165,
      "yield_per_acre": 8,
      "price_per_qtl": 7100,
      "msp_backed": true,
      "labour_days": 55,
      "price_volatility": "medium",
      "season": "kharif"
    },
    "sugarcane": {
      "group": "cash",
      "cost": 60000,
      "water_mm": 2000,
      "duration_days": 360,
      "yield_per_acre": 400,
      "price_per_qtl": 315,
      "msp_backed": true,
      "labour_days": 80,
      "price_volatility": "low",
      "note": "very thirsty; confirm water availability before committing"
    },
    "jute": {
      "group": "cash",
      "cost": 20000,
      "water_mm": 500,
      "duration_days": 120,
      "yield_per_acre": 18,
      "price_per_qtl": 5300,
      "msp_backed": true,
      "labour_days": 38,
      "price_volatility": "medium"
    },
    "potato": {
      "group": "vegetable",
      "cost": 55000,
      "water_mm": 500,
      "duration_days": 100,
      "yield_per_acre": 100,
      "price_per_qtl": 1200,
      "msp_backed": false,
      "labour_days": 55,
      "price_volatility": "high",
      "season": "rabi",
      "note": "seed tubers are ~40% of cost; price swings hard at harvest"
    },
    "tomato": {
      "group": "vegetable",
      "cost": 60000,
      "water_mm": 450,
      "duration_days": 120,
      "yield_per_acre": 200,
      "price_per_qtl": 1200,
      "msp_backed": false,
      "labour_days": 70,
      "price_volatility": "high",
      "note": "highest price volatility of any crop here; needs a market plan"
    },
    "watermelon": {
      "group": "cucurbit",
      "cost": 35000,
      "water_mm": 500,
      "duration_days": 85,
      "yield_per_acre": 180,
      "price_per_qtl": 900,
      "msp_backed": false,
      "labour_days": 40,
      "price_volatility": "high",
      "season": "zaid"
    },
    "muskmelon": {
      "group": "cucurbit",
      "cost": 35000,
      "water_mm": 500,
      "duration_days": 80,
      "yield_per_acre": 100,
      "price_per_qtl": 1600,
      "msp_backed": false,
      "labour_days": 38,
      "price_volatility": "high",
      "season": "zaid"
    },
    "coffee": {
      "group": "perennial",
      "cost": 55000,
      "water_mm": 1800,
      "duration_days": 365,
      "yield_per_acre": 6,
      "price_per_qtl": 17000,
      "msp_backed": false,
      "labour_days": 90,
      "price_volatility": "high",
      "establishment_cost": 180000,
      "years_to_income": 4,
      "productive_years": 30
    },
    "banana": {
      "group": "perennial",
      "cost": 70000,
      "water_mm": 1800,
      "duration_days": 330,
      "yield_per_acre": 250,
      "price_per_qtl": 1400,
      "msp_backed": false,
      "labour_days": 70,
      "price_volatility": "high",
      "establishment_cost": 120000,
      "years_to_income": 1,
      "productive_years": 3
    },
    "grapes": {
      "group": "perennial",
      "cost": 110000,
      "water_mm": 700,
      "duration_days": 365,
      "yield_per_acre": 90,
      "price_per_qtl": 5500,
      "msp_backed": false,
      "labour_days": 140,
      "price_volatility": "high",
      "establishment_cost": 350000,
      "years_to_income": 3,
      "productive_years": 20
    },
    "pomegranate": {
      "group": "perennial",
      "cost": 60000,
      "water_mm": 700,
      "duration_days": 365,
      "yield_per_acre": 60,
      "price_per_qtl": 6000,
      "msp_backed": false,
      "labour_days": 80,
      "price_volatility": "high",
      "establishment_cost": 180000,
      "years_to_income": 3,
      "productive_years": 15
    },
    "mango": {
      "group": "perennial",
      "cost": 40000,
      "water_mm": 900,
      "duration_days": 365,
      "yield_per_acre": 45,
      "price_per_qtl": 4000,
      "msp_backed": false,
      "labour_days": 55,
      "price_volatility": "high",
      "establishment_cost": 110000,
      "years_to_income": 5,
      "productive_years": 40
    },
    "orange": {
      "group": "perennial",
      "cost": 45000,
      "water_mm": 900,
      "duration_days": 365,
      "yield_per_acre": 60,
      "price_per_qtl": 3200,
      "msp_backed": false,
      "labour_days": 60,
      "price_volatility": "high",
      "establishment_cost": 130000,
      "years_to_income": 4,
      "productive_years": 25
    },
    "apple": {
      "group": "perennial",
      "cost": 60000,
      "water_mm": 700,
      "duration_days": 365,
      "yield_per_acre": 50,
      "price_per_qtl": 7000,
      "msp_backed": false,
      "labour_days": 85,
      "price_volatility": "high",
      "establishment_cost": 220000,
      "years_to_income": 5,
      "productive_years": 30
    },
    "papaya": {
      "group": "perennial",
      "cost": 50000,
      "water_mm": 1500,
      "duration_days": 300,
      "yield_per_acre": 180,
      "price_per_qtl": 1500,
      "msp_backed": false,
      "labour_days": 65,
      "price_volatility": "high",
      "establishment_cost": 90000,
      "years_to_income": 1,
      "productive_years": 3
    },
    "coconut": {
      "group": "perennial",
      "cost": 45000,
      "water_mm": 1800,
      "duration_days": 365,
      "yield_per_acre": 45,
      "price_per_qtl": 3000,
      "msp_backed": false,
      "labour_days": 50,
      "price_volatility": "medium",
      "establishment_cost": 140000,
      "years_to_income": 6,
      "productive_years": 60
    }
  },
  "stage_templates": {
    "cereal": [
      [
        "Land preparation",
        -0.12,
        0.18,
        0.15
      ],
      [
        "Sowing + basal dose",
        0.0,
        0.26,
        0.18
      ],
      [
        "First weeding",
        0.16,
        0.1,
        0.14
      ],
      [
        "Top dressing 1",
        0.22,
        0.14,
        0.06
      ],
      [
        "Pest scouting spray",
        0.42,
        0.09,
        0.07
      ],
      [
        "Top dressing 2",
        0.52,
        0.09,
        0.05
      ],
      [
        "Harvest",
        1.0,
        0.14,
        0.35
      ]
    ],
    "pulse": [
      [
        "Land preparation",
        -0.12,
        0.2,
        0.16
      ],
      [
        "Sowing + seed treatment",
        0.0,
        0.3,
        0.2
      ],
      [
        "First weeding",
        0.2,
        0.12,
        0.16
      ],
      [
        "Pod borer spray",
        0.5,
        0.16,
        0.1
      ],
      [
        "Second spray",
        0.68,
        0.08,
        0.06
      ],
      [
        "Harvest",
        1.0,
        0.14,
        0.32
      ]
    ],
    "cash": [
      [
        "Land preparation",
        -0.1,
        0.15,
        0.12
      ],
      [
        "Sowing + basal dose",
        0.0,
        0.22,
        0.15
      ],
      [
        "First weeding",
        0.14,
        0.09,
        0.12
      ],
      [
        "Top dressing 1",
        0.2,
        0.12,
        0.05
      ],
      [
        "Pest management 1",
        0.34,
        0.11,
        0.08
      ],
      [
        "Top dressing 2",
        0.46,
        0.1,
        0.05
      ],
      [
        "Pest management 2",
        0.58,
        0.09,
        0.08
      ],
      [
        "Harvest / picking",
        1.0,
        0.12,
        0.35
      ]
    ],
    "perennial": [
      [
        "Pruning + basin repair",
        0.02,
        0.18,
        0.2
      ],
      [
        "Manure + basal dose",
        0.1,
        0.24,
        0.1
      ],
      [
        "Irrigation cycle",
        0.28,
        0.14,
        0.08
      ],
      [
        "Pest / disease round 1",
        0.4,
        0.12,
        0.1
      ],
      [
        "Top dressing",
        0.52,
        0.12,
        0.06
      ],
      [
        "Pest / disease round 2",
        0.68,
        0.08,
        0.09
      ],
      [
        "Harvest",
        0.92,
        0.12,
        0.37
      ]
    ],
    "cucurbit": [
      [
        "Land prep + mulch",
        -0.14,
        0.26,
        0.16
      ],
      [
        "Sowing + basal dose",
        0.0,
        0.22,
        0.14
      ],
      [
        "Trailing + weeding",
        0.22,
        0.1,
        0.16
      ],
      [
        "Fertigation",
        0.34,
        0.14,
        0.06
      ],
      [
        "Fruit fly management",
        0.52,
        0.12,
        0.1
      ],
      [
        "Harvest (multi-pick)",
        1.0,
        0.16,
        0.38
      ]
    ],
    "vegetable": [
      [
        "Land prep + bed making",
        -0.15,
        0.14,
        0.12
      ],
      [
        "Seed material + planting",
        0.0,
        0.28,
        0.16
      ],
      [
        "Gap filling + weeding",
        0.15,
        0.08,
        0.12
      ],
      [
        "Top dressing 1",
        0.25,
        0.11,
        0.06
      ],
      [
        "Pest / disease round 1",
        0.38,
        0.11,
        0.08
      ],
      [
        "Top dressing 2",
        0.5,
        0.09,
        0.05
      ],
      [
        "Pest / disease round 2",
        0.62,
        0.08,
        0.07
      ],
      [
        "Harvest (multi-pick)",
        1.0,
        0.11,
        0.34
      ]
    ]
  },
  "constants": {
    "IRRIGATION_CAPACITY_MM": {
      "rainfed": 0,
      "well": 300,
      "borewell": 700,
      "canal": 900,
      "drip": 1200
    },
    "DRIP_EFFICIENCY_GAIN": 0.35,
    "IRRIGATION_COST_PER_MM_ACRE": 42,
    "HIRED_LABOUR_RATE": 400,
    "SEASON_WINDOWS": {
      "kharif": [
        6,
        8
      ],
      "rabi": [
        10,
        12
      ],
      "zaid": [
        1,
        3
      ]
    },
    "GOAL_WEIGHTS": {
      "max_profit": [
        0.45,
        0.25,
        0.05,
        0.1,
        0.15
      ],
      "safest": [
        0.15,
        0.15,
        0.4,
        0.15,
        0.15
      ],
      "low_water": [
        0.15,
        0.15,
        0.15,
        0.45,
        0.1
      ],
      "low_capital": [
        0.15,
        0.25,
        0.15,
        0.1,
        0.35
      ]
    }
  }
};
