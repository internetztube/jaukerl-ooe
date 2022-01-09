<template>
  <div>
    Termine kannst du hier buchen: <br>
    <a href="https://www.land-oberoesterreich.gv.at/files/covid19impfungopen/#/online-terminvereinbarung"
       target="_blank" style="display: block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
      https://www.land-oberoesterreich.gv.at/files/covid19impfungopen/#/online-terminvereinbarung
    </a>


    <div class="row">
      <div class="col-md-6">
        <br>
        <b>Wenn du schon einen Termin hast,</b><br> registriere dich mit den selben Daten einfach nochmal. Wenn du einen
        besseren Termin gefunden hast, den alten absagen und danach direkt den neuen Termin buchen. Absagen kannst du
        den Termin mit dem Link aus der E-Mail deiner alten Buchung. Solange du den alten Termin
        nicht abgesagt hast, kannst du auch keinen neuen Termin buchen. <br /><br />
        <b>
          Seit dem 12. Juli 2021 kannst du nach dem gleichen Schema auch den Termin für deine <u>ZWEITimpfung</u> verschieben.
        </b>

        <br />
        <br />

        Weitere Informationen findest du unter <a href="https://www.land-oberoesterreich.gv.at/ooe-impft.htm" target="_blank">http://ooe-impft.at/</a>.


      </div>
      <div class="col-md-5 offset-md-1">
        <br>
        <setting-birthdate/>
        <br>
        Bei Fragen steht das Land Oberösterreich für dich zur Verfügung: <br />
        <a href="mailto:buergerservice@ooe.gv.at">buergerservice@ooe.gv.at</a><br />
        <a href="tel:+437327720 78 700">+43 732 772 078-700</a>
      </div>
    </div>

    <br>
    Alle Angaben ohne Gewähr.

    <br>
    <br>
  </div>
</template>

<script>
import SettingBirthdate from "@/components/index/setting-birthdate";
export default {
  components: { SettingBirthdate }
}
</script>
