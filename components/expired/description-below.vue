<template>
  <div>
    <p>
      <b>Von wo kommen die Daten?</b><br>
      Seit dem 16.02.2021 werden die Daten, die vom Land über die Schnittstelle zurückkommen minütlich
      archiviert. <br>

      Nicht gebuchte Termine verschwinden zu dem Zeitpunkt, an dem der Impftermin stattgefunden hätte. Wenn ein
      Termin mindestens 2 Minuten vor dem eigentlichen Termin nicht gebucht worden ist, wird davon ausgegangen,
      dass niemand diesen Termin gebucht hat. Im Einzelnachweiß sieht man auch den Zeitpunkt an dem der jeweilige
      Termin das letzte Mal gesehen wurde.
    </p>

    <p>
      <b>Transparenz:</b><br>
      Alle zugrunde liegenden Daten und die gesamte Logik ist auf Github einsehbar. <br>
      <a href="https://github.com/internetztube/jaukerl-ooe-archive" target="_blank">internetztube/jaukerl-ooe-archive</a><br>
      <a href="https://github.com/internetztube/jaukerl-ooe-api" target="_blank">internetztube/jaukerl-ooe-api</a>
    </p>

    <p>
      <b>Warum akkumulieren sich die nicht gebuchten Termine über Tage hinweg?</b><br/>
      Es ist davon auszugehen, dass wenn an einem Tag ein Impftermin nicht wahrgenommen wird, dass für den
      darauffolgenden Tag ein neuer Termin ins System gespielt wird. Deswegen kann es vorkommen, dass sich so über
      mehrere Tage einige Termine anhäufen.
    </p>
  </div>
</template>
