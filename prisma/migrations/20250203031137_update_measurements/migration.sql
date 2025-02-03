-- CreateTable
CREATE TABLE "Measurement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weight" REAL NOT NULL,
    "chestWidth" REAL NOT NULL,
    "shoulderWidth" REAL NOT NULL,
    "waistWidth" REAL NOT NULL,
    "leftArm" REAL NOT NULL,
    "rightArm" REAL NOT NULL,
    "leftWrist" REAL NOT NULL,
    "rightWrist" REAL NOT NULL,
    "leftForearm" REAL NOT NULL,
    "rightForearm" REAL NOT NULL,
    "leftThigh" REAL NOT NULL,
    "rightThigh" REAL NOT NULL,
    "imageUrl" TEXT NOT NULL
);
