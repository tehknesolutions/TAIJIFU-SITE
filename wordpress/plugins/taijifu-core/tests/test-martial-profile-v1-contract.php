<?php
/** Martial Profile V1 contract tests. */
class Taijifu_Core_Martial_Profile_V1_Test extends WP_UnitTestCase {
    public function test_profile_has_identity_and_private_defaults(): void {
        $user_id = self::factory()->user->create();
        $profile = TJF_Practitioner_Profile::read( $user_id );
        $this->assertSame( TJF_TUID::for_user( $user_id ), $profile['tuid'] );
        $this->assertSame( [], $profile['arts'] );
        $this->assertSame( [], $profile['dojos'] );
        $this->assertSame( 'essential', $profile['coach_onboarding_stage'] );
        $this->assertSame( 'private', $profile['privacy']['coach'] );
    }

    public function test_update_sanitizes_profile_values(): void {
        $user_id = self::factory()->user->create();
        $profile = TJF_Practitioner_Profile::update( $user_id, [
            'arts' => [ '<b>Karate</b>', 'Judo' ],
            'dojos' => [ ' Dojo Central ' ],
        ] );
        $this->assertSame( [ 'Karate', 'Judo' ], $profile['arts'] );
        $this->assertSame( [ 'Dojo Central' ], $profile['dojos'] );
    }

    public function test_user_cannot_mutate_another_profile(): void {
        $owner = self::factory()->user->create();
        $other = self::factory()->user->create();
        wp_set_current_user( $other );
        $this->expectException( RuntimeException::class );
        TJF_Practitioner_Profile::update( $owner, [ 'arts' => [ 'Judo' ] ] );
    }
}
