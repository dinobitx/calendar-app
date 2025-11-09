package com.morev.calendar.util;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;

import static org.assertj.core.api.Assertions.assertThat;

class DateTimeUtilTest {

    @Test
    void toUtcLocal_convertsOffsetToUtcLocal() {
        OffsetDateTime odt = OffsetDateTime.of(
                2025, 11, 5, 10, 0, 0, 0,
                ZoneOffset.ofHours(3)
        );

        LocalDateTime utc = DateTimeUtil.toUtcLocal(odt);

        assertThat(utc).isEqualTo(LocalDateTime.of(2025, 11, 5, 7, 0));
    }

    @Test
    void fromUtcLocal_returnsOffsetWithUtc() {
        LocalDateTime ldt = LocalDateTime.of(2025, 11, 5, 7, 0);

        var odt = DateTimeUtil.fromUtcLocal(ldt);

        assertThat(odt.getOffset()).isEqualTo(ZoneOffset.UTC);
        assertThat(odt.getHour()).isEqualTo(7);
    }

    @Test
    void toUtcLocal_normalizesDifferentOffsetsToSameInstant() {
        var odt1 = OffsetDateTime.of(2025, 11, 5, 10, 0, 0, 0, ZoneOffset.ofHours(3));
        var odt2 = OffsetDateTime.of(2025, 11, 5, 9, 0, 0, 0, ZoneOffset.ofHours(2));

        var utc1 = DateTimeUtil.toUtcLocal(odt1);
        var utc2 = DateTimeUtil.toUtcLocal(odt2);

        assertThat(utc1).isEqualTo(utc2);
    }
}

