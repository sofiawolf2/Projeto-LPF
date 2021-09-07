plugins {
    kotlin("js") version "1.5.30"
}

group = "me.alexa"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}



kotlin {
    js {
        browser {
        }
        binaries.executable()
    }
}