<?php
/**
 * Presentation-safe integration boundary for TAIJIFU Core.
 */

declare(strict_types=1);

if (! function_exists('taijifu_canon_core_available')) {
    function taijifu_canon_core_available(): bool
    {
        return defined('TJF_CORE_VERSION')
            || class_exists('TJF_Content_Types')
            || class_exists('TJF_Taxonomies');
    }
}

if (! function_exists('taijifu_canon_core_state')) {
    /**
     * Returns presentation state only. It never registers or mutates domain data.
     *
     * @return array{available: bool, message: string}
     */
    function taijifu_canon_core_state(?bool $available = null): array
    {
        $available ??= taijifu_canon_core_available();

        return $available
            ? ['available' => true, 'message' => 'TAIJIFU Core disponível.']
            : ['available' => false, 'message' => 'O núcleo TAIJIFU não está disponível neste ambiente. A apresentação CANON permanece acessível.'];
    }
}
