<?php
/** TAIJIFU Universal ID contract tests. */
class Taijifu_Core_TUID_Contract_Test extends WP_UnitTestCase {
    public function test_user_receives_one_stable_person_tuid(): void {
        $user_id = self::factory()->user->create();
        $first   = TJF_TUID::for_user( $user_id );
        $second  = TJF_TUID::for_user( $user_id );

        $this->assertSame( $first, $second );
        $this->assertMatchesRegularExpression( '/^TJF-PER-[A-Z0-9]+$/', $first );
        $this->assertNotEmpty( get_user_meta( $user_id, 'tjf_uuid', true ) );
        $this->assertSame( $first, get_user_meta( $user_id, 'tjf_tuid', true ) );
    }

    public function test_mint_is_deterministic_for_same_uuid(): void {
        $uuid = '550e8400-e29b-41d4-a716-446655440000';
        $this->assertSame( TJF_TUID::mint( 'person', $uuid ), TJF_TUID::mint( 'person', $uuid ) );
    }

    public function test_mint_rejects_unknown_entity_type(): void {
        $this->expectException( InvalidArgumentException::class );
        TJF_TUID::mint( 'unknown', wp_generate_uuid4() );
    }
}
