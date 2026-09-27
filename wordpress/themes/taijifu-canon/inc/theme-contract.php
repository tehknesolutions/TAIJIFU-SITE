<?php
/**
 * Presentation-safe integration boundary for TAIJIFU Core.
 */

declare(strict_types=1);

if (! function_exists('taijifu_canon_core_available')) {
    function taijifu_canon_core_available(): bool
    {
        return defined('TAIJIFU_CORE_VERSION')
            || class_exists('Taijifu\\Core\\Plugin')
            || function_exists('taijifu_core_boot');
    }
}
